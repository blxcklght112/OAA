using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Models;

[Table("User")]
public partial class User
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [StringLength(20)]
    public string FirstName { get; set; } = null!;

    [StringLength(20)]
    public string LastName { get; set; } = null!;

    [Column("DOB", TypeName = "datetime")]
    public DateTime Dob { get; set; }

    [StringLength(10)]
    public string Gender { get; set; } = null!;

    [StringLength(10)]
    public string Role { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime JoinedDate { get; set; }

    [StringLength(10)]
    public string UserCode { get; set; } = null!;

    [StringLength(20)]
    public string Username { get; set; } = null!;

    [StringLength(20)]
    public string Password { get; set; } = null!;

    [DefaultValue(true)]
    public bool IsFirstLogin { get; set; }

    [InverseProperty("AssignedByUser")]
    public virtual ICollection<Assignment> AssignmentAssignedByUsers { get; } = new List<Assignment>();

    [InverseProperty("AssignedToUser")]
    public virtual ICollection<Assignment> AssignmentAssignedToUsers { get; } = new List<Assignment>();
}