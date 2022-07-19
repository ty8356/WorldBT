using AutoMapper;
using WorldBT.Models.Model;
using WorldBT.Models.ResponseModel;

namespace WorldBT.Models.Mapper
{
    public class HistologyMappingProfile : Profile
    {
        public HistologyMappingProfile()
        {
            CreateMap<Histology, HistologyResponseModel>()
                ;
        }
    }
}