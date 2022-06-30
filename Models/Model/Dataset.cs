using System;
using System.Collections.Generic;

namespace WorldBT.Models.Model
{
    public partial class Dataset
    {
        public Dataset()
        {
            Patient = new HashSet<Patient>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Center { get; set; }

        public virtual ICollection<Patient> Patient { get; set; }
    }
}
