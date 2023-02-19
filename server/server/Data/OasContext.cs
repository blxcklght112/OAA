using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public partial class OasContext : DbContext
{
    public OasContext()
    {
    }

    public OasContext(DbContextOptions<OasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Asset> Assets { get; set; }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:Connection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Asset>(entity =>
        {
            entity.HasOne(d => d.Category).WithMany(p => p.Assets)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Asset_Category");
        });

        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.HasOne(d => d.Asset).WithMany(p => p.Assignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Assignment_Asset");

            entity.HasOne(d => d.AssignedByUser).WithMany(p => p.AssignmentAssignedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Assignment_User");

            entity.HasOne(d => d.AssignedToUser).WithMany(p => p.AssignmentAssignedToUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Assignment_User1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
