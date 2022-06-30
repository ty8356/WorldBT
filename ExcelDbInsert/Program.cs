﻿using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using WorldBT.Models.Model;
using WorldBT.Models.Settings;
// using WorldBT.Interfaces.Services;
// using WorldBT.Services;

namespace WorldBT.ExcelDbInsert
{
    public class Program
    {
        public static IConfigurationRoot Configuration;

        static void Main(string[] args)
        {
            Console.WriteLine("Starting Excel Data Insert application...");

            var services = InitialServiceCollection();

            ConfigureServices(services);

            var provider = BuildServiceProvider(services);

            var insertData = provider.GetRequiredService<InsertData>();
            insertData.Execute();

            Console.WriteLine("Exiting...");
        }

        public static IServiceCollection InitialServiceCollection()
        {
            IServiceCollection services = new ServiceCollection();

            var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            // Setup configuration:
            Configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environmentName}.json", optional: true)
                .Build();

            ConfigureBaseServices(services, environmentName);

            services.AddLogging();

            return services;
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ApplicationSettings>(Configuration.GetSection("AppSettings"));

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<IConfiguration>(_ => { return Configuration; });

            // services.AddTransient<IGeneService, GeneService>();
        }

        private static void ConfigureBaseServices(IServiceCollection services, string environmentName)
        {
            // Setup container here, just like a asp.net core app
            services.AddScoped(provider => new WorldBT.Models.Mapper.MapperConfiguration().ConfigureAutoMapper(provider));

            //ditto iconfiguration
            services.AddSingleton<IConfiguration>(_ => { return Configuration; });

            //context and storage
            var connectionString = Configuration.GetConnectionString("DbConn");
            services.AddDbContext<WorldBtDbContext>(options => options.UseSqlServer(connectionString));

            services.AddScoped<InsertData, InsertData>();

            var cultureInfo = new System.Globalization.CultureInfo("en-US");
            System.Globalization.CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            System.Globalization.CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
        }

        public static IServiceProvider BuildServiceProvider(IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();

            var loggerFactory = serviceProvider.GetRequiredService<ILoggerFactory>();

            return serviceProvider;
        }
    }
}
