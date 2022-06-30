using System;
using System.Collections.Generic;

namespace WorldBT.Models.Model
{
    public partial class TsneCoordinate
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public virtual Patient Patient { get; set; }
    }
}
