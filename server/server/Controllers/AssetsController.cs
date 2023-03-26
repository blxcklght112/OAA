using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AssetsController : ControllerBase
    {
        private readonly OasContext _context;
        private readonly IAssetService _service;

        public AssetsController(OasContext context, IAssetService service)
        {
            _context = context;
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet("/get-assets")]
        public async Task<List<Asset>> GetAllAssets()
        {
            var count = _context.Assets.Count();

            Response.Headers.Add("Asset-Pagination", count.ToString());

            return await _service.GetAllAssets();
        }

        // GET: api/Assets/5
        [AllowAnonymous]
        [HttpGet("/get-asset/{id:int}")]
        public async Task<Asset> GetAssetById(int id)
        {
            return await _service.GetAssetById(id);
        }

        // PUT: api/Assets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("/update-asset/{id:int}")]
        public async Task<Asset> UpdateAsset(int id, Asset asset)
        {
            return await _service.UpdateAsset(id, asset);
        }

        // POST: api/Assets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/create-asset")]
        public async Task<Asset> CreateAsset(Asset asset)
        {
            return await _service.CreateAsset(asset);
        }

        // DELETE: api/Assets/5
        [HttpDelete("/delete-asset/{id:int}")]
        public async Task DeleteAsset(int id)
        {
            await _service.DeleteAsset(id);
        }
    }
}
