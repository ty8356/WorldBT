using AutoMapper;
using WorldBT.Models.Model;
using WorldBT.Models.ResponseModel;

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