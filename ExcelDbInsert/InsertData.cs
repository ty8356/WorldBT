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
            InsertMetaData();

            InsertGenomics();
        }

        private void InsertMetaData()
        {
            Console.WriteLine("Starting metadata file insert...");

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var file = new FileInfo("files/MetaData.xlsx");

            using (var package = new ExcelPackage(file))
            {
                var worksheet = package?
                    .Workbook?
                    .Worksheets?
                    .FirstOrDefault();

                var totalRows = worksheet?
                    .Dimension?
                    .Rows;

                if (totalRows == null)
                {
                    Console.WriteLine("No rows found.");
                }
                else
                {
                    Console.WriteLine($"Found {totalRows} rows.");

                    var headers = worksheet.GetHeaderColumns();
                    var columns = headers.ReadColumnNumbers();

                    for (int i = 2; i <= totalRows; i++)
                    {
                        // Console.WriteLine($"Found patient with file name: {worksheet.Cells[i, columns["filename"]]?.Value?.ToString() ?? ""}.");

                        var currentFileName = worksheet.Cells[i, columns["filename"]]?.Value?.ToString() ?? null;
                        var currentDataset = worksheet.Cells[i, columns["dataset"]]?.Value?.ToString() ?? null;
                        var currentHistology = worksheet.Cells[i, columns["histology"]]?.Value?.ToString() ?? null;
                        var currentSubgroup = worksheet.Cells[i, columns["subgroup"]]?.Value?.ToString() ?? null;
                        var currentLocation = worksheet.Cells[i, columns["location"]]?.Value?.ToString() ?? null;
                        var currentTissueType = worksheet.Cells[i, columns["tissuetype"]]?.Value?.ToString() ?? null;
                        var currentCenter = worksheet.Cells[i, columns["center"]]?.Value?.ToString() ?? null;
                        var currentTsne1 = worksheet.Cells[i, columns["tsne1"]]?.Value?.ToString() ?? null;
                        var currentTsne2 = worksheet.Cells[i, columns["tsne2"]]?.Value?.ToString() ?? null;

                        // Create dataset if not found
                        // Console.WriteLine("Checking dataset...");
                        var datasetId = _context
                            .Datasets
                            .Where(x => x.Name == currentDataset)
                            .FirstOrDefault()?
                            .Id;
                            
                        if (datasetId == null)
                        {
                            var newDataset = new Dataset
                            {
                                Name = currentDataset,
                                Center = currentCenter
                            };

                            _context
                                .Datasets
                                .Add(newDataset);

                            _context
                                .SaveChanges();

                            // Console.WriteLine($"Dataset '{currentDataset}' created.");

                            datasetId = newDataset.Id;
                        }
                        // else
                        // {
                        //     Console.WriteLine($"Existing dataset '{currentDataset}' found.");
                        // }

                        // Create histology if not found
                        // Console.WriteLine("Checking histology...");
                        var histologyId = _context
                            .Histologies
                            .Where(x => x.Name == currentHistology)
                            .FirstOrDefault()?
                            .Id;
                            
                        if (histologyId == null)
                        {
                            var newHistology = new Histology
                            {
                                Name = currentHistology
                            };

                            _context
                                .Histologies
                                .Add(newHistology);

                            _context
                                .SaveChanges();

                            // Console.WriteLine($"Histology '{currentHistology}' created.");

                            histologyId = newHistology.Id;
                        }
                        // else
                        // {
                        //     Console.WriteLine($"Existing histology '{currentHistology}' found.");
                        // }

                        // Create subgroup if not found
                        // Console.WriteLine("Checking subgroup...");
                        var subgroupId = _context
                            .Subgroups
                            .Where(x => x.Name == currentSubgroup)
                            .FirstOrDefault()?
                            .Id;
                            
                        if (subgroupId == null)
                        {
                            var newSubgroup = new Subgroup
                            {
                                Name = currentSubgroup
                            };

                            _context
                                .Subgroups
                                .Add(newSubgroup);

                            _context
                                .SaveChanges();

                            // Console.WriteLine($"Subgroup '{currentSubgroup}' created.");

                            subgroupId = newSubgroup.Id;
                        }
                        // else
                        // {
                        //     Console.WriteLine($"Existing subgroup '{currentSubgroup}' found.");
                        // }

                        // Create location if not found
                        // Console.WriteLine("Checking location...");
                        var locationId = _context
                            .Locations
                            .Where(x => x.Name == currentLocation)
                            .FirstOrDefault()?
                            .Id;
                            
                        if (locationId == null)
                        {
                            var newLocation = new Location
                            {
                                Name = currentLocation
                            };

                            _context
                                .Locations
                                .Add(newLocation);

                            _context
                                .SaveChanges();

                            // Console.WriteLine($"Location '{currentLocation}' created.");

                            locationId = newLocation.Id;
                        }
                        // else
                        // {
                        //     Console.WriteLine($"Existing location '{currentLocation}' found.");
                        // }

                        // Create tissue type if not found
                        // Console.WriteLine("Checking tissue type...");
                        var tissueTypeId = _context
                            .TissueTypes
                            .Where(x => x.Name == currentTissueType)
                            .FirstOrDefault()?
                            .Id;
                            
                        if (tissueTypeId == null)
                        {
                            var newTissueType = new TissueType
                            {
                                Name = currentTissueType
                            };

                            _context
                                .TissueTypes
                                .Add(newTissueType);

                            _context
                                .SaveChanges();

                            // Console.WriteLine($"Tissue type '{currentTissueType}' created.");

                            tissueTypeId = newTissueType.Id;
                        }
                        // else
                        // {
                        //     Console.WriteLine($"Existing tissue type '{currentTissueType}' found.");
                        // }

                        // Create patient
                        // Console.WriteLine("Creating new patient...");
                        var patient = new Patient
                        {
                            FileName = currentFileName,
                            DatasetId = (Guid) datasetId,
                            HistologyId = (int) histologyId,
                            SubgroupId = (int) subgroupId,
                            LocationId = (int) locationId,
                            TissueTypeId = (int) tissueTypeId
                        };

                        _context
                            .Patients
                            .Add(patient);

                        _context
                            .SaveChanges();

                        // Console.WriteLine($"Patient {patient.Id} created.");

                        // Create tsne coordinate
                        // Console.WriteLine("Creating new tsne coordinate...");
                        var tsneCoordinate = new TsneCoordinate
                        {
                            PatientId = patient.Id,
                            X = Convert.ToDecimal(currentTsne1),
                            Y = Convert.ToDecimal(currentTsne2)
                        };

                        _context
                            .TsneCoordinates
                            .Add(tsneCoordinate);
    
                        _context
                            .SaveChanges();

                        // Console.WriteLine($"Tsne coordinate {tsneCoordinate.Id} created.");
                    }
                }
            }

            Console.WriteLine("Metadata file insert completed.");
        }

        private void InsertGenomics()
        {
            Console.WriteLine("Starting genomic file insert...");

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var file = new FileInfo("files/genomic.xlsx");

            using (var package = new ExcelPackage(file))
            {
                var worksheet = package?
                    .Workbook?
                    .Worksheets?
                    .FirstOrDefault();

                var totalRows = worksheet?
                    .Dimension?
                    .Rows;

                var totalColumns = worksheet?
                    .Dimension?
                    .Columns;

                if (totalRows == null)
                    return;

                if (totalColumns == null || totalColumns <= 1)
                {
                    Console.WriteLine("No patient columns found in file.");
                    return;
                }

                Console.WriteLine($"Found {totalRows} rows.");
                Console.WriteLine($"Found {totalColumns - 1} patients.");

                var headers = worksheet.GetHeaderColumns();
                var columns = headers.ReadColumnNumbers();

                for (int i = 2; i <= totalRows; i++)
                {
                    // Console.WriteLine($"Found patient with file name: {worksheet.Cells[i, columns["filename"]]?.Value?.ToString() ?? ""}.");

                    var currentEntrezId = worksheet.Cells[i, columns["entrezgeneid"]]?.Value?.ToString() ?? null;

                    // Create gene if not found
                    // Console.WriteLine("Checking gene...");
                    var geneId = _context
                        .Genes
                        .Where(x => x.EntrezId == Convert.ToInt32(currentEntrezId))
                        .FirstOrDefault()?
                        .Id;
                        
                    if (geneId == null)
                    {
                        var newGene = new Gene
                        {
                            EntrezId = Convert.ToInt32(currentEntrezId)
                        };

                        _context
                            .Genes
                            .Add(newGene);

                        _context
                            .SaveChanges();

                        // Console.WriteLine($"Gene '{currentEntrezId}' created.");

                        geneId = newGene.Id;
                    }
                    // else
                    // {
                    //     Console.WriteLine($"Existing gene '{currentEntrezId}' found.");
                    // }

                    // loop through each column (patient)
                    for (int x = 2; x <= totalColumns; x++)
                    {
                        // find patient
                        var fileName = worksheet.Cells[1, x]?.Value?.ToString()?.Trim()?.ToLower() ?? null;
                        var patientId = _context
                            .Patients
                            .Where(pt => pt.FileName.Trim().ToLower() == fileName)
                            .FirstOrDefault()?
                            .Id;
                        
                        if (patientId == null)
                            throw new Exception($"Patient with file name {fileName ?? "null"} could not be found.");

                        // insert gene expression value
                        var geneExpressionValueString = worksheet.Cells[i, x]?.Value?.ToString() ?? null;
                        if (geneExpressionValueString == null)
                            continue;

                        var geneExpressionValue = Convert.ToDecimal(geneExpressionValueString);

                        var newGeneExpression = new GeneExpression
                        {
                            GeneId = (Guid) geneId,
                            PatientId = (Guid) patientId,
                            ExpressionValue = geneExpressionValue
                        };

                        _context
                            .GeneExpressions
                            .Add(newGeneExpression);

                        _context
                            .SaveChanges();
                    }
                }
            }

            Console.WriteLine("Genomic file insert completed.");
        }
    }
}