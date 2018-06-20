using Frozen.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace Frozen
{
    public static class RegisterServices
    {
        public static void AddMyServices(this IServiceCollection services, IConfiguration configuration)
        {
            // add database context
            services.AddDbContext<ProjectContext>(options => options.UseSqlServer(configuration.GetConnectionString("FrozenDatabase")));

            services.AddTransient(typeof(Services.ProjectService));
        }
    }
}
