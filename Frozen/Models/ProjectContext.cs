using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Frozen.Models
{
    public class ProjectContext : DbContext
    {
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options) { }

        public DbSet<Project> Projects { get; set; }
    }
}
