using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WorldBT.Models.Model
{
    public partial class WorldBtDbContext : DbContext
    {
        public WorldBtDbContext()
        {
        }

        public WorldBtDbContext(DbContextOptions<WorldBtDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Dataset> Dataset { get; set; }
        public virtual DbSet<Gene> Gene { get; set; }
        public virtual DbSet<GeneExpression> GeneExpression { get; set; }
        public virtual DbSet<Histology> Histology { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Patient> Patient { get; set; }
        public virtual DbSet<Subgroup> Subgroup { get; set; }
        public virtual DbSet<TissueType> TissueType { get; set; }
        public virtual DbSet<TsneCoordinate> TsneCoordinate { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //TODO:: move to appsettings
                optionsBuilder.UseSqlServer("Server=tcp:mistry-worldbt.database.windows.net,1433;Initial Catalog=worldbt-db;Persist Security Info=False;User ID=worldbtadmin;Password=P@ssw0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dataset>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Center)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(80);
            });

            modelBuilder.Entity<Gene>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Name).HasMaxLength(80);
            });

            modelBuilder.Entity<GeneExpression>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.ExpressionValue).HasColumnType("decimal(12, 9)");

                entity.HasOne(d => d.Gene)
                    .WithMany(p => p.GeneExpression)
                    .HasForeignKey(d => d.GeneId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.GeneExpression)
                    .HasForeignKey(d => d.PatientId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Histology>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(30);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(40);
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasIndex(e => e.FileName)
                    .HasName("UQ__Patient__589E6EECB3E52983")
                    .IsUnique();

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FileName)
                    .IsRequired()
                    .HasMaxLength(80);

                entity.HasOne(d => d.Dataset)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.DatasetId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Histology)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.HistologyId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Subgroup)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.SubgroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.TissueType)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.TissueTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Subgroup>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(30);
            });

            modelBuilder.Entity<TissueType>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(30);
            });

            modelBuilder.Entity<TsneCoordinate>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.TsneCoordinate)
                    .HasForeignKey(d => d.PatientId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
