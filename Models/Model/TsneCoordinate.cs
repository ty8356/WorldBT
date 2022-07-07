using System;
using System.Collections.Generic;

namespace WorldBT.Models.Model
{
    public partial class TsneCoordinate
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public decimal X { get; set; }
        public decimal Y { get; set; }

        public virtual Patient Patient { get; set; }
    }
}
