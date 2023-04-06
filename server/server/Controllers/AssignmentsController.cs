using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [Authorize(Roles = "Admin")]
    public class AssignmentsController : ControllerBase
    {
        private readonly OasContext _context;
        private readonly IAssignmentService _service;

        public AssignmentsController(OasContext context, IAssignmentService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/Assignments
        [HttpGet("/all-assignments")]
        public async Task<List<Assignment>> GetAllAssignments()
        {
            var count = _context.Assignments.Count();

            Response.Headers.Add("Assignment-Count", count.ToString());

            return await _service.GetAllAssignments();
        }

        [AllowAnonymous]
        // GET: api/Assignments/5
        [HttpGet("/get-assignment/{id}")]
        public async Task<Assignment> GetAssignmentById(int id)
        {
            return await _service.GetAssignmentById(id);
        }

        [AllowAnonymous]
        [HttpGet("/own-assignments")]
        public async Task<List<Assignment>> OwnAssignments(string username)
        {
            var count = _context.Assignments.Where(x => x.AssignedToUserName == username).Count();

            Response.Headers.Add("Own-Assignment-Count", count.ToString());

            return await _service.OwnAssignments(username);
        }

        // PUT: api/Assignments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("/update-assignment/{id}")]
        public async Task<Assignment> UpdateAssignment(int id, Assignment assignment)
        {
            return await _service.UpdateAssignment(id, assignment);
        }

        [AllowAnonymous]
        [HttpPut("/status-assignment/{id}")]
        public async Task<Assignment> StatusAssignment(int id, Assignment assignment)
        {
            return await _service.AssignmentStatus(id, assignment);
        }

        // POST: api/Assignments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/create-assignment")]
        public async Task<Assignment> CreateAssignment(Assignment assignment)
        {
          return await _service.CreateAssignment(assignment);
        }

        // DELETE: api/Assignments/5
        [HttpDelete("/delete-assignment/{id}")]
        public async Task DeleteAssignment(int id)
        {
            await _service.DeleteAssignment(id);
        }
    }
}
