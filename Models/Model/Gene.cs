using System;
using System.Collections.Generic;

namespace WorldBT.Models.Model
{
    public partial class Gene
    {
        public Gene()
        {
            GeneExpression = new HashSet<GeneExpression>();
        }

        public Guid Id { get; set; }
        public int EntrezId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<GeneExpression> GeneExpression { get; set; }
    }
}
