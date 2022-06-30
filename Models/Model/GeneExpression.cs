using System;
using System.Collections.Generic;

namespace WorldBT.Models.Model
{
    public partial class GeneExpression
    {
        public Guid Id { get; set; }
        public Guid GeneId { get; set; }
        public Guid PatientId { get; set; }
        public decimal ExpressionValue { get; set; }

        public virtual Gene Gene { get; set; }
        public virtual Patient Patient { get; set; }
    }
}
