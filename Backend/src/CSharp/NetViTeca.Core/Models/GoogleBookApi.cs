namespace NetViTeca.Core.Models;

public class GoogleBooksResponse
{
    public List<Item> Items { get; set; }
}

public class Item
{
    public VolumeInfo volumeInfo { get; set; }
}

public class VolumeInfo
{
    public string title { get; set; }
    public List<string> authors { get; set; }
    public string description { get; set; }
    public string publishedDate { get; set; }
    public int pageCount { get; set; }
    public List<string> categories { get; set; }
    public ImageLinks imageLinks { get; set; }
}

public class ImageLinks
{
    public string thumbnail { get; set; }
}
