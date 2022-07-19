using AutoMapper;
using WorldBT.Models.Model;
using WorldBT.Models.ResponseModel;

namespace WorldBT.Models.Mapper
{
    public class SubgroupMappingProfile : Profile
    {
        public SubgroupMappingProfile()
        {
            CreateMap<Subgroup, SubgroupResponseModel>()
                ;
        }
    }
}