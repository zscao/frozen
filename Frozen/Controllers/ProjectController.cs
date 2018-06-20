using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frozen.Models;
using Frozen.Services;
using Frozen.ViewModels;

namespace Frozen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private ProjectService _service = null;

        public ProjectController(ProjectService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Project>> List(int pageIndex)
        {
            return await _service.List(pageIndex);
        }


        [HttpGet("Detail/{id}", Name = "GetById")]
        public async Task<ActionResult<Project>>GetById(int id)
        {
            var result = await _service.GetById(id);
            if (result == null) return NotFound();

            return result;
        }

        [HttpPost("Create")]
        public async Task<ActionResult<Project>> Create(ProjectModel project)
        {
            var result = await _service.Create(project);

            return CreatedAtRoute("GetById", new { id = result.Id }, result);
        }

    }
}