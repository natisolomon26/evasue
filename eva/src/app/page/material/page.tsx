import Link from "next/link";
import { 
  FileText, 
  Download, 
  FileType, 
  Calendar, 
  Search, 
  Filter, 
  BookOpen,
  ArrowDownToLine,
  FileIcon,
  Eye,
  Clock,
  Sparkles,
  TrendingUp
} from "lucide-react";

interface Material {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
  downloads?: number;
  size?: string;
  category?: string;
}

async function getMaterials(): Promise<Material[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/materials`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch materials");
  }

  const data = await res.json();

  // Only published materials
  return data.data.filter((m: any) => m.isPublished);
}

export default async function MaterialsPage() {
  const materials = await getMaterials();

  // Get unique categories
  const categories = [...new Set(materials.map(m => m.category).filter(Boolean))];
  
  // Get file type statistics
  const fileTypeCounts = materials.reduce((acc, material) => {
    const type = material.fileType.toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-800 via-sky-900 to-sky-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Knowledge Hub</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Training Materials & Resources
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Access premium training materials, guides, and resources to accelerate your professional growth and development.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{materials.length}</div>
                <div className="text-white/80 text-sm">Total Materials</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{Object.keys(fileTypeCounts).length}</div>
                <div className="text-white/80 text-sm">File Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {materials.reduce((acc, m) => acc + (m.downloads || 0), 0).toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{categories.length}</div>
                <div className="text-white/80 text-sm">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Materials */}
        {materials.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-3">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Featured Resources</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Materials</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {materials
                .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
                .slice(0, 3)
                .map((material, index) => (
                  <div
                    key={material._id}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                    
                    <div className="relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200">
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 rounded-xl ${
                            material.fileType.includes('pdf') ? 'bg-red-100 text-red-600' :
                            material.fileType.includes('doc') ? 'bg-blue-100 text-blue-600' :
                            material.fileType.includes('ppt') ? 'bg-orange-100 text-orange-600' :
                            material.fileType.includes('xls') ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {material.fileType.includes('pdf') ? <FileText className="w-6 h-6" /> :
                             material.fileType.includes('doc') ? <FileType className="w-6 h-6" /> :
                             <FileIcon className="w-6 h-6" />}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 mb-1">#{index + 1} Most Downloaded</div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {material.title}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                          {material.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              {material.downloads?.toLocaleString() || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(material.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <Link
                            href={material.fileUrl}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all group/link"
                          >
                            <ArrowDownToLine className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                            <span className="font-medium">Download</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}