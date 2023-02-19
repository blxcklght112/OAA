using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Category")]
public partial class Category
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [StringLength(20)]
    public string Name { get; set; } = null!;

    [StringLength(20)]
    public string Prefix { get; set; } = null!;

    [InverseProperty("Category")]
    public virtual ICollection<Asset> Assets { get; } = new List<Asset>();
}
