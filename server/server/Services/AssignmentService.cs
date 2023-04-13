using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly OasContext _context;

        public AssignmentService(OasContext context)
        {
            _context = context;
        }  

        public async Task<Assignment> AssignmentStatus(int id, Assignment assignment)
        {
            var _assignment = await _context.Assignments.FindAsync(id);

            if(_assignment != null)
            {
                _assignment.Status = assignment.Status;
                _context.Assignments.Update(_assignment);
                await _context.SaveChangesAsync();
                return _assignment;
            }

            return null;
        }

        public async Task<Assignment> CreateAssignment(Assignment assignment)
        {
            var assignedBy = await _context.Users.FirstOrDefaultAsync(x => x.Id == assignment.AssignedByUserId);
            var assignedTo = await _context.Users.FirstOrDefaultAsync(x => x.Id == assignment.AssignedToUserId);
            var foundAsset = await _context.Assets.FirstOrDefaultAsync(x => x.Id == assignment.AssetId);

            if(assignedBy != null && assignedTo != null && foundAsset != null)
            {
                var item = await _context.Assignments.AddAsync(
                    new Assignment
                    {
                        AssetId = foundAsset.Id,
                        AssetName = foundAsset.AssetName,
                        AssetCode = foundAsset.AssetCode,
                        AssignedToUserId = assignedTo.Id,
                        AssignedToUserName = assignedTo.Username,
                        AssignedByUserId = assignedBy.Id,
                        AssignedByUserName = assignedBy.Username,
                        AssignedDate = assignment.AssignedDate,
                        Note = assignment.Note,
                        Status = "Waiting"
                    });

                await _context.SaveChangesAsync();

                return item.Entity;
            }

            return null;
        }

        public async Task DeleteAssignment(int id)
        {
            var _assignment = await _context.Assignments.FindAsync(id);

            if (_assignment != null)
            {
                _context.Assignments.Remove(_assignment);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Assignment>> GetAllAssignments()
        {
            return await _context.Assignments.ToListAsync();
        }

        public async Task<Assignment> GetAssignmentById(int id)
        {
            var _assignment = await _context.Assignments.FindAsync(id);

            if(_assignment != null)
            {
                return _assignment;
            }

            return null;
        }

        public async Task<List<Assignment>> OwnAssignments(string username)
        {
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if(foundUser != null)
            {
                var ownAssignments = await _context.Assignments.Where(x => x.AssignedToUserName == username && (x.Status.ToLower() == "waiting")).ToListAsync();

                return ownAssignments;
            }

            return null;
        }

        public async Task<Assignment> UpdateAssignment(int id, Assignment assignment)
        {
            var _assignment = await _context.Assignments.FindAsync(id);

            if(_assignment != null)
            {
                _assignment.AssetId = assignment.AssetId;
                _assignment.AssetName = assignment.AssetName;
                _assignment.AssignedByUserId = assignment.AssignedByUserId;
                _assignment.AssignedByUserName = assignment.AssignedByUserName;
                _assignment.AssignedToUserId = assignment.AssignedToUserId;
                _assignment.AssignedToUserName = assignment.AssignedToUserName;
                _assignment.AssignedDate = assignment.AssignedDate;
                _assignment.Note = assignment.Note;
                _assignment.Status = assignment.Status;

                _context.Assignments.Update(_assignment);
                await _context.SaveChangesAsync();
                return _assignment;
            }

            return null;
        }
    }
}
