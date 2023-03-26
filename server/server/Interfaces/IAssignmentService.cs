using server.Models;

namespace server.Interfaces
{
    public interface IAssignmentService
    {
        Task<Assignment> CreateAssignment(Assignment assignment);

        Task<Assignment> GetAssignmentById(int id);

        Task<List<Assignment>> GetAllAssignments();

        Task<List<Assignment>> OwnAssignments(string username);

        Task<Assignment> UpdateAssignment(int id, Assignment assignment);

        Task<Assignment> AssignmentStatus(int id, Assignment assignment);

        Task DeleteAssignment(int id);
    }
}
