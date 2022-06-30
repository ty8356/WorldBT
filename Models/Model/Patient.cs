using System;
using System.Collections.Generic;

namespace WorldBT.Models.Model
{
    public partial class Patient
    {
        public Patient()
        {
            GeneExpression = new HashSet<GeneExpression>();
            TsneCoordinate = new HashSet<TsneCoordinate>();
        }

        public Guid Id { get; set; }
        public string FileName { get; set; }
        public Guid DatasetId { get; set; }
        public int HistologyId { get; set; }
        public int SubgroupId { get; set; }
        public int LocationId { get; set; }
        public int TissueTypeId { get; set; }

        public virtual Dataset Dataset { get; set; }
        public virtual Histology Histology { get; set; }
        public virtual Location Location { get; set; }
        public virtual Subgroup Subgroup { get; set; }
        public virtual TissueType TissueType { get; set; }
        public virtual ICollection<GeneExpression> GeneExpression { get; set; }
        public virtual ICollection<TsneCoordinate> TsneCoordinate { get; set; }
    }
}
