using AutoMapper;
using WorldBT.Models.Model;
using WorldBT.Models.ResponseModel;

namespace WorldBT.Models.Mapper
{
    public class PatientMappingProfile : Profile
    {
        public PatientMappingProfile()
        {
            CreateMap<Patient, PatientResponseModel>()
                ;
        }
    }
}