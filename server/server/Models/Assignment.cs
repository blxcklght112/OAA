using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Assignment")]
public partial class Assignment
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [StringLength(20)]
    public string AssetName { get; set; } = null!;

    [Column("AssetID")]
    public int AssetId { get; set; }

    [Column("AssignedByUserID")]
    public int AssignedByUserId { get; set; }

    [StringLength(20)]
    public string AssignedByUserName { get; set; } = null!;

    [Column("AssignedToUserID")]
    public int AssignedToUserId { get; set; }

    [StringLength(20)]
    public string AssignedToUserName { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime AssignedDate { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }

    [StringLength(10)]
    public string Status { get; set; } = null!;

    [ForeignKey("AssetId")]
    [InverseProperty("Assignments")]
    public virtual Asset Asset { get; set; } = null!;

    [ForeignKey("AssignedByUserId")]
    [InverseProperty("AssignmentAssignedByUsers")]
    public virtual User AssignedByUser { get; set; } = null!;

    [ForeignKey("AssignedToUserId")]
    [InverseProperty("AssignmentAssignedToUsers")]
    public virtual User AssignedToUser { get; set; } = null!;
}
