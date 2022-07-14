using System;
using System.Collections.Generic;

namespace WorldBT.Models.ResponseModel
{
    public class TsneCoordinateResponseModel
    {
        public Guid Id { get; set; }
        public decimal X { get; set; }
        public decimal Y { get; set; }
        public Guid PatientId { get; set; }

        // public PatientResponseModel Patient { get; set; }
    }
}
