using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WorldBT.Interfaces.Services;
using WorldBT.Models.ErrorHandling.Exceptions;
using WorldBT.Models.Model;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace WorldBT.Services
{
    public class HistologyService : IHistologyService
    {
        private readonly WorldBtDbContext _context;

        public HistologyService(
            WorldBtDbContext context
        )
        {
            _context = context;
        }

        public IQueryable<Histology> FetchAll()
        {
            var histologies = _context
                .Histologies
                .OrderBy(x => x.Name)
                .AsQueryable();

            return histologies;
        }
    }
}
