using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Frozen.Models
{
    [Table("Project")]
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(2000)]
        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
