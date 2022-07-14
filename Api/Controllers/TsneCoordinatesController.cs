using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using WorldBT.Interfaces.Services;
using WorldBT.Models.ErrorHandling.Exceptions;
using WorldBT.Models.ResponseModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;

namespace WorldBT.Api.Controllers
{
    [ApiController]
    [Route("tsne-coordinates")]
    public class TsneCoordinatesController : ControllerBase
    {
        private readonly ILogger<TsneCoordinatesController> _logger;
        private readonly IMapper _mapper;
        private readonly ITsneCoordinateService _tsneCoordinateService;

        public TsneCoordinatesController(ILogger<TsneCoordinatesController> logger
            ,IMapper mapper
            ,ITsneCoordinateService tsneCoordinateService
        )
        {
            _logger = logger;
            _mapper = mapper;
            _tsneCoordinateService = tsneCoordinateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tsneCoordinates = _tsneCoordinateService
                .FetchAll();
            
            return Ok(_mapper.Map<List<TsneCoordinateResponseModel>>(tsneCoordinates));
        }
    }
}
