using server.Models;

namespace server.Interfaces
{
    public interface IAssetService
    {
        Task<Asset> CreateAsset(Asset asset);

        Task<Asset> GetAssetById(int id);

        Task<List<Asset>> GetAllAssets();

        Task DeleteAsset(int id);

        Task<Asset> UpdateAsset(int id, Asset asset);
    }
}
