using System;
using System.Collections.Generic;

namespace WorldBT.Models.ResponseModel
{
    public class PatientResponseModel
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }

        public HistologyResponseModel Histology { get; set; }
        public LocationResponseModel Location { get; set; }
        public SubgroupResponseModel Subgroup { get; set; }
        public TissueTypeResponseModel TissueType { get; set; }
    }
}
