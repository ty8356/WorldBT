using AutoMapper;
using WorldBT.Models.Model;
using WorldBT.Models.ResponseModel;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WorldBT.Models.Mapper
{
    public class TsneCoordinateMappingProfile : Profile
    {
        public TsneCoordinateMappingProfile()
        {
            CreateMap<TsneCoordinate, TsneCoordinateResponseModel>()
                ;
        }
    }
}