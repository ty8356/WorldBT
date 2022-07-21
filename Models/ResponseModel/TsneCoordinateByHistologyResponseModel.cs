using System;
using System.Collections.Generic;

namespace WorldBT.Models.ResponseModel
{
    public class TsneCoordinateByHistologyResponseModel
    {
        public string Histology { get; set; }
        public List<TsneCoordinateResponseModel> TsneCoordinates { get; set; }
    }
}
