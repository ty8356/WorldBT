using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using WorldBT.Models.Model;
using WorldBT.Models.Settings;
using Microsoft.Extensions.Options;
using OfficeOpenXml;

namespace WorldBT.ExcelDbInsert
{
    public class InsertData
    {
        private readonly WorldBtDbContext _context;
        private readonly ApplicationSettings _applicationSettings;

        public InsertData(
            WorldBtDbContext context
            ,IOptions<ApplicationSettings> applicationSettings
            )
        {
            _context = context;
            _applicationSettings = applicationSettings.Value;
        }

        // NOTE: tons of hard coding because this is a one-time thing
        public void Execute()
        {
            InsertInitial();
        }

        private void InsertInitial()
        {
            Console.WriteLine("it works!");
        }
    }
}