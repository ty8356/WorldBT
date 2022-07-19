using AutoMapper;
using WorldBT.Models.Model;
using WorldBT.Models.ResponseModel;

namespace WorldBT.Models.Mapper
{
    public class TissueTypeMappingProfile : Profile
    {
        public TissueTypeMappingProfile()
        {
            CreateMap<TissueType, TissueTypeResponseModel>()
                ;
        }
    }
}