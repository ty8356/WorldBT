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

        public virtual DbSet<Dataset> Datasets { get; set; }
        public virtual DbSet<Gene> Genes { get; set; }
        public virtual DbSet<GeneExpression> GeneExpressions { get; set; }
        public virtual DbSet<Histology> Histologies { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<Subgroup> Subgroups { get; set; }
        public virtual DbSet<TissueType> TissueTypes { get; set; }
        public virtual DbSet<TsneCoordinate> TsneCoordinates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dataset>(entity =>
            {
                entity.ToTable("Dataset");

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
                entity.ToTable("Gene");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Name).HasMaxLength(80);
            });

            modelBuilder.Entity<GeneExpression>(entity =>
            {
                entity.ToTable("GeneExpression");

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
                entity.ToTable("Histology");

                entity.Property(e => e.Name).HasMaxLength(30);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("Location");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.ToTable("Patient");

                entity.HasIndex(e => e.FileName)
                    .HasName("UQ__Patient__589E6EECB3E52983")
                    .IsUnique();

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FileName)
                    .IsRequired()
                    .HasMaxLength(200);

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
                entity.ToTable("Subgroup");

                entity.Property(e => e.Name).HasMaxLength(30);
            });

            modelBuilder.Entity<TissueType>(entity =>
            {
                entity.ToTable("TissueType");

                entity.Property(e => e.Name).HasMaxLength(30);
            });

            modelBuilder.Entity<TsneCoordinate>(entity =>
            {
                entity.ToTable("TsneCoordinate");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.X).HasColumnType("decimal(12, 9)");

                entity.Property(e => e.Y).HasColumnType("decimal(12, 9)");

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
