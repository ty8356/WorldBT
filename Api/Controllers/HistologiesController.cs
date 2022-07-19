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
    [Route("histologies")]
    public class HistologiesController : ControllerBase
    {
        private readonly ILogger<HistologiesController> _logger;
        private readonly IMapper _mapper;
        private readonly IHistologyService _histologyService;

        public HistologiesController(ILogger<HistologiesController> logger
            ,IMapper mapper
            ,IHistologyService histologyService
        )
        {
            _logger = logger;
            _mapper = mapper;
            _histologyService = histologyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var histologies = _histologyService
                .FetchAll();
            
            return Ok(_mapper.Map<List<HistologyResponseModel>>(histologies));
        }
    }
}
