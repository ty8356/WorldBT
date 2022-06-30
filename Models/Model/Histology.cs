using System;
using System.Collections.Generic;

namespace WorldBT.Models.Model
{
    public partial class Histology
    {
        public Histology()
        {
            Patient = new HashSet<Patient>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Patient> Patient { get; set; }
    }
}
