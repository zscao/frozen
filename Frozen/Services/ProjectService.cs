using Frozen.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Frozen.ViewModels;

namespace Frozen.Services
{
    public class ProjectService
    {
        private ProjectContext _dbContext = null;

        public ProjectService(ProjectContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Project>> List(int startIndex)
        {
            if (_dbContext.Projects.Count() == 0)
            {
                _dbContext.Projects.Add(new Project { Title = "Flynas Booking System", Description = "the project I am working on", CreatedDate = DateTime.Today, LastUpdated = DateTime.Today });
                await _dbContext.SaveChangesAsync();
            }

            return await _dbContext.Projects.ToListAsync();
        }

        public async Task<Project> GetById(int id)
        {
            return await _dbContext.Projects.FirstOrDefaultAsync(p => p.Id == id);
        }


        public async Task<Project> Create(ProjectModel model)
        {
            var result = await _dbContext.Projects.AddAsync(new Project()
            {
                Title = model.Title,
                Description = model.Description,
                CreatedDate = DateTime.Today,
                LastUpdated = DateTime.Today
            });

            await _dbContext.SaveChangesAsync();

            return result.Entity;
        }

    }
}
