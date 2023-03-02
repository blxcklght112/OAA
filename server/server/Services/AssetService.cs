using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;
using Asset = server.Models.Asset;

namespace server.Services
{
    public class AssetService : IAssetService
    {
        private readonly OasContext _context;  

        public AssetService(OasContext context)
        {
            _context = context;
        }

        public async Task<Asset> CreateAsset(Asset asset)
        {
            //Auto Generate AssetCode
            var ids = _context.Assets.Select(x => x.Id).ToArray();
            Array.Sort(ids);
            int subAssetCode = ids.Last() + 1;

            var foundCategory = await _context.Categories.FindAsync(asset.CategoryId);

            if (foundCategory != null)
            {
                var addingAsset = new Asset
                {
                    AssetCode = $"{foundCategory.Prefix}{subAssetCode:0000}",
                    AssetName = asset.AssetName,
                    Specification = asset.Specification,
                    InstalledDate = asset.InstalledDate,
                    CategoryId = foundCategory.Id,
                    CategoryName = foundCategory.Name
                };

                var item = await _context.Assets.AddAsync(addingAsset);

                await _context.SaveChangesAsync();

                return item.Entity;
            }

            return null;
        }

        public async Task DeleteAsset(int id)
        {
            var _asset = await _context.Assets.FindAsync(id);
            if (_asset != null)
            {
                _context.Assets.Remove(_asset);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Asset>> GetAllAssets()
        {
            return await _context.Assets.ToListAsync();
        }

        public async Task<Asset> GetAssetById(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset != null)
            {
                return asset;
            }
            return null;
        }

        public async Task<Asset> UpdateAsset(int id, Asset asset)
        {
            var _asset = await _context.Assets.FindAsync(id);
            if (_asset != null)
            {
                _asset.AssetName = asset.AssetName;
                _asset.Specification = asset.Specification;
                _asset.InstalledDate = asset.InstalledDate;
                _context.Assets.Update(_asset);
                await _context.SaveChangesAsync();
                return _asset;
            }
            return null;
        }
    }
}
