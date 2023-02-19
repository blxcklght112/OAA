using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Asset")]
public partial class Asset
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [StringLength(20)]
    public string AssetName { get; set; } = null!;

    [StringLength(20)]
    public string AssetCode { get; set; } = null!;

    [StringLength(50)]
    public string? Specification { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime InstalledDate { get; set; }

    [StringLength(20)]
    public string CategoryName { get; set; } = null!;

    [Column("CategoryID")]
    public int CategoryId { get; set; }

    [InverseProperty("Asset")]
    public virtual ICollection<Assignment> Assignments { get; } = new List<Assignment>();

    [ForeignKey("CategoryId")]
    [InverseProperty("Assets")]
    public virtual Category Category { get; set; } = null!;
}
