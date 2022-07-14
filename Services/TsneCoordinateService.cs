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
    public class TsneCoordinateService : ITsneCoordinateService
    {
        private readonly WorldBtDbContext _context;

        public TsneCoordinateService(
            WorldBtDbContext context
        )
        {
            _context = context;
        }

        public IQueryable<TsneCoordinate> FetchAll()
        {
            var tsneCoordinates = _context
                .TsneCoordinates
                .AsQueryable();

            return tsneCoordinates;
        }
    }
}
