using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using WorldBT.Models.Model;
using System.Linq;

namespace WorldBT.Interfaces.Services
{
    public interface ITsneCoordinateService
    {
        IQueryable<TsneCoordinate> FetchAll();
    }
}