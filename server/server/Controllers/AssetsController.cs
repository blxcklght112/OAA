using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [Authorize(Roles = "Admin")]
    public class AssetsController : ControllerBase
    {
        private readonly OasContext _context;
        private readonly AssetService _service;

        public AssetsController(OasContext context, AssetService service)
        {
            _context = context;
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet("/getallassets")]
        public async Task<List<Asset>> GetAllAssets()
        {
            var count = _context.Assets.Count();

            Response.Headers.Add("Asset-Pagination", count.ToString());

            return await _service.GetAllAssets();
        }

        // GET: api/Assets/5
        [AllowAnonymous]
        [HttpGet("/getasset/{id:int}")]
        public async Task<Asset> GetAssetById(int id)
        {
            return await _service.GetAssetById(id);
        }

        // PUT: api/Assets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("/updateasset/{id:int}")]
        public async Task<Asset> UpdateAsset(int id, Asset asset)
        {
            return await _service.UpdateAsset(id, asset);
        }

        // POST: api/Assets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/createasset")]
        public async Task<Asset> CreateAsset(Asset asset)
        {
            return await _service.CreateAsset(asset);
        }

        // DELETE: api/Assets/5
        [HttpDelete("/deleteasset/{id:int}")]
        public async Task DeleteAsset(int id)
        {
            await _service.DeleteAsset(id);
        }
    }
}
