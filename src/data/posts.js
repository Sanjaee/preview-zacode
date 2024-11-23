// src/data/posts.js
const posts = [
  {
    id: 1,
    title: "Cara Integrasi Midtrans dengan Laravel",
    content:
      "Ingin mengintegrasikan pembayaran online di Laravel? Tutorial ini akan membimbing Anda menggunakan Midtrans secara efektif.",
    description:
      "Panduan singkat dan jelas mengenai cara mengintegrasikan Midtrans, sebuah layanan payment gateway, dengan Laravel. Tutorial ini mencakup langkah-langkah konfigurasi, instalasi package, pengaturan API key, serta contoh implementasi pembayaran menggunakan Midtrans pada aplikasi Laravel. Disclaimer: Sebelum mengikuti tutorial ini, disarankan untuk memiliki pemahaman dasar tentang PHP atau pemrograman. Pengetahuan dasar tersebut akan membantu Anda lebih mudah memahami konsep dan langkah-langkah yang dijelaskan.",
    image:
      "https://res.cloudinary.com/dgmlqboeq/image/upload/v1729720256/folder%20BLOG%20ZACODE/laravel/Screenshot_2024-10-24_045003_udhh3z.png",
    category: "Express.js",
    contentSections: [
      {
        type: "text",
        content:
          " Install laravel terlebih dahulu, lebih mudah menggunakan Laragon,untuk cara menggunakan laragon ada di yt pak sandhika galih bagian playlist laravel 11, jika sudah ada skip ini",
      },

      {
        type: "code",
        content: `composer global require laravel/installer`,
      },

      {
        type: "text",
        content:
          "jika sudah di install masukan project ke vscode lalu buka terminal vscode masuk ke directory project lalu install dependencies midtrans untuk laravel",
      },

      {
        type: "code",
        content: `composer require midtrans/midtrans-php`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan environment config midtrans dan isi api key nya, pergi ke folder config lalu buat file midtrans.php  (config/midtrans.php) , dan masukan code ini untuk menyambungkan api key yang ada di .env ke midtrans",
      },

      {
        type: "code",
        content: `<?php

return [
    'server_key' => env('MIDTRANS_SERVER_KEY'),
    'client_key' => env('MIDTRANS_CLIENT_KEY'),
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'merchant_id' => env('MIDTRANS_MERCHANT_ID'),
];`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan environment config midtrans dan isi api key nya, pergi ke .env lalu tambahkan variable ini",
      },

      {
        type: "code",
        content: `MIDTRANS_SERVER_KEY=SB-Mid-server-123
MIDTRANS_CLIENT_KEY=SB-Mid-client-123
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_MERCHANT_ID=G12345`,
      },

      {
        type: "text",
        content:
          "jika sudah, buat akun midtrans nya di https://midtrans.com/en jika belum ada akun silahkan buat akun di https://dashboard.midtrans.com/register lalu jika sudah login ke midtrans masuk ke sandbox dan ambil api key nya seperti vidio di bawah ini",
      },

      {
        type: "video",
        src: "https://res.cloudinary.com/dgmlqboeq/video/upload/v1729722426/folder%20BLOG%20ZACODE/Untitled_video_-_Made_with_Clipchamp_gqfwdh.mp4",
      },

      {
        type: "text",
        content:
          "jika sudah, buat migrasi dan model di laravel jangan lupa buat database nya dulu di mysql atau postgresql, saya mengunakan laragon jadi otomatis db di terbuat di mysql dan sambungkan db di .env",
      },

      {
        type: "code",
        content: `DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=payment // ubah nama db nya
DB_USERNAME=root
DB_PASSWORD= // tambahkan jika ada`,
      },

      {
        type: "text",
        content: "jika sudah, buat migrasi dan model di laravel ",
      },

      {
        type: "code",
        content: `php artisan make:model Product -m`,
      },

      {
        type: "code",
        content: `php artisan make:model Transaction -m`,
      },
      {
        type: "code",
        content: `php artisan make:model TransactionItem -m`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan scema database dan model di bawah ini untuk migrasi database/migrations/2024_10_23_create_products_table.php ",
      },

      {
        type: "code",
        content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('stock');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan scema di bawah ini untuk migrasi database/migrations/2024_10_23_create_transactions_table.php ",
      },

      {
        type: "code",
        content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('order_id')->unique();
            $table->decimal('total_amount', 10, 2);
            $table->string('status');
            $table->string('snap_token')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan scema di bawah ini untuk migrasi database/migrations/2024_10_23_create_transaction_items_table.php",
      },

      {
        type: "code",
        content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_items');
    }
};
`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan model di bawah ini untuk products model app/Models/Product.php ",
      },

      {
        type: "code",
        content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'stock', 'image'];

    public function transactions()
    {
        return $this->hasMany(TransactionItem::class);
    }
}`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan model di bawah ini untuk transaction model app/Models/Transaction.php ",
      },

      {
        type: "code",
        content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Transaction extends Model
{
    protected $fillable = ['user_id', 'order_id', 'total_amount', 'status', 'snap_token'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }
}`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan model di bawah ini untuk transaction model app/Models/TransactionItem.php ",
      },

      {
        type: "code",
        content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class TransactionItem extends Model
{
    protected $fillable = ['transaction_id', 'product_id', 'quantity', 'price'];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}`,
      },

      {
        type: "text",
        content:
          "jika sudah, jalankan migrasi dengan perintah php artisan migrate ",
      },

      {
        type: "code",
        content: `php artisan migrate`,
      },

      {
        type: "text",
        content:
          "lalu buat logic atau controller nya untuk menampilkan dan save data di database, buat file controller untuk product ",
      },

      {
        type: "code",
        content: `php artisan make:controller ProductController`,
      },

      {
        type: "text",
        content: "jika sudah, buat controller untuk transaction ",
      },

      {
        type: "code",
        content: `php artisan make:controller TransactionController`,
      },

      {
        type: "text",
        content: "jika sudah, buat controller untuk auth login nya ",
      },


      {
        type: "code",
        content: `php artisan make:controller Auth\\LoginController`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan logic controller product di bawah ini app/Http/Controllers/ProductController.php",
      },

      {
        type: "code",
        content: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Product;
use Illuminate\\Http\\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return view('products.index', compact('products'));
    }

    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }
}
`,
      },

      {
        type: "text",
        content:
          "jika sudah, masukan logic controller transaction dan midtrans nya di bawah ini app/Http/Controllers/TransactionController.php ",
      },

      {
        type: "code",
        content: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Product;
use App\\Models\\Transaction;
use App\\Models\\TransactionItem;
use Illuminate\\Http\\Request;
use Midtrans\\Config;
use Midtrans\\Snap;

class TransactionController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);
        
        if ($product->stock < $request->quantity) {
            return back()->with('error', 'Stock tidak mencukupi');
        }

        $total_amount = $product->price * $request->quantity;
        $order_id = 'TRX-' . time();

        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'order_id' => $order_id,
            'total_amount' => $total_amount,
            'status' => 'pending'
        ]);

        TransactionItem::create([
            'transaction_id' => $transaction->id,
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'price' => $product->price
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $order_id,
                'gross_amount' => $total_amount
            ],
            'customer_details' => [
                'first_name' => auth()->user()->name,
                'email' => auth()->user()->email,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            $transaction->update(['snap_token' => $snapToken]);

            return view('transactions.payment', compact('snapToken', 'transaction'));
        } catch (\\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function callback(Request $request)
    {
        $serverKey = config('midtrans.server_key');
        $hashed = hash("sha512", $request->order_id.$request->status_code.$request->gross_amount.$serverKey);
        
        if ($hashed == $request->signature_key) {
            $transaction = Transaction::where('order_id', $request->order_id)->first();
            
            if ($request->transaction_status == 'capture' || $request->transaction_status == 'Settlement') {
                $transaction->update(['status' => 'paid']);
                
                // Update stock
                foreach ($transaction->items as $item) {
                    $product = $item->product;
                    $product->update([
                        'stock' => $product->stock - $item->quantity
                    ]);
                }
            } elseif ($request->transaction_status == 'cancel' || $request->transaction_status == 'expire') {
                $transaction->update(['status' => 'cancelled']);
            }
        }

        return response()->json(['status' => 'success']);
    }

    public function updatePaymentStatus(Request $request)
    {
        $transaction = Transaction::where('order_id', $request->order_id)->first();
        
        if ($transaction) {
            $transaction->update(['status' => 'paid']);
            
            // Update stock
            foreach ($transaction->items as $item) {
                $product = $item->product;
                $product->update([
                    'stock' => $product->stock - $item->quantity
                ]);
            }
            
            return response()->json(['status' => 'success']);
        }
        
        return response()->json(['status' => 'error'], 404);
    }

    
    public function index()
{
    // Mengambil semua transaksi untuk pengguna yang sedang login
    $transactions = Transaction::with('items.product')
        ->where('user_id', auth()->id())
        ->orderBy('created_at', 'desc')
        ->get();

    // Mengembalikan view dengan data transaksi
    return view('transactions.history', compact('transactions'));
}

}`,
      },
      

      {
        type: "text",
        content:
          "jika sudah, masukan logic controller auth loginnya di bawah ini app/Http/Controllers/Auth/LoginController.php ",
      },

      {
        type: "code",
        content: `<?php

namespace App\\Http\\Controllers\\Auth;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;
use Illuminate\\Validation\\ValidationException;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            return redirect()->route('home');
        }

        throw ValidationException::withMessages([
            'email' => [__('auth.failed')],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect()->route('home');
    }
}
`,
      },

      {
        type: "text",
        content:
          "jika sudah, sekarang buat ui untuk semua logic nya dan seperti ini struktur view nya",
      },

      {
        type: "image",
        src: "https://res.cloudinary.com/dgmlqboeq/image/upload/v1729724223/folder%20BLOG%20ZACODE/laravel/Screenshot_2024-10-24_055643_pnxsai.png",
      },

      {
        type: "text",
        content:
          "untuk view navbar atau navigasi nya resources/views/layouts/app.blade.php",
      },

      {
        type: "code",
        content: `<!DOCTYPE html>
<html>
<head>
    <title>Laravel Midtrans</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="{{ url('/') }}">Laravel Midtrans</a>
            <div class="collapse navbar-collapse">
                <a href="{{ route('transactions.index') }}" class="btn btn-primary"> Transaction History</a>
                <ul class="navbar-nav ms-auto">
                    @guest
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">Login</a>
                        </li>
                    @else
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('logout') }}"
                               onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                Logout
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                @csrf
                            </form>
                        </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>

    <main class="py-4">
        <div class="container">
            @yield('content')
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    @stack('scripts')
</body>
</html>`,
      },

      {
        type: "text",
        content: "untuk view auth login resources/views/auth/login.blade.php",
      },

      {
        type: "code",
        content: `@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Login</h2>

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" class="form-control" required autofocus>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="form-control" required>
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
        </div>
    </form>
</div>
@endsection
`,
      },

      {
        type: "text",
        content: "untuk view product resources/views/products/index.blade.php",
      },

      {
        type: "code",
        content: `@extends('layouts.app')

@section('styles')
<style>
    .product-card {
        height: 100%;
        transition: all 0.3s ease;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .product-card .card-img-top {
        height: 200px;
        object-fit: cover;
        width: 100%;
    }
    
    .product-card .card-body {
        padding: 1.25rem;
        background: white;
    }
    
    .product-card .card-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        height: 2.4rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    .product-card .card-text {
        margin-bottom: 0.5rem;
    }
    
    .product-card .description {
        height: 4.5rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    
    .btn-primary {
        transition: all 0.2s ease;
        width: 100%;
        margin-top: 1rem;
    }
    
    .btn-primary:hover {
        transform: scale(1.02);
    }
    
    .price {
        font-size: 1.1rem;
        font-weight: 600;
        color: #2c3e50;
    }
    
    .stock {
        color: #6c757d;
        font-size: 0.9rem;
    }
</style>
@endsection

@section('content')
<div class="container py-4">
    <h2 class="mb-4">Products</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
        @foreach($products as $product)
            <div class="col">
                <div class="product-card card h-100">
                    @if($product->image)
                        <img src="{{ asset($product->image) }}" class="card-img-top" alt="{{ $product->name }}">
                    @endif
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ $product->name }}</h5>
                        <p class="card-text description">{{ $product->description }}</p>
                        <p class="card-text price">Rp {{ number_format($product->price) }}</p>
                        <p class="card-text stock">Stock: {{ $product->stock }}</p>
                        <a href="{{ route('products.show', $product) }}" class="btn btn-primary mt-auto">View Details</a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection`,
      },

      {
        type: "text",
        content:
          "untuk view detail product resources/views/products/show.blade.php",
      },

      {
        type: "code",
        content: `@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6">
            @if($product->image)
                <img src="{{ asset($product->image) }}" class="img-fluid" alt="{{ $product->name }}">
            @endif
        </div>
        <div class="col-md-6">
            <h2>{{ $product->name }}</h2>
            <p>{{ $product->description }}</p>
            <p class="h4">Price: Rp {{ number_format($product->price) }}</p>
            <p>Stock: {{ $product->stock }}</p>

            @auth
                <form action="{{ route('checkout') }}" method="POST">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->id }}">
                    <div class="mb-3">
                        <label for="quantity" class="form-label">Quantity</label>
                        <div class="input-group" style="max-width: 150px;">
                            <button type="button" class="btn btn-outline-secondary" id="minus-btn">-</button>
                            <input type="number" class="form-control text-center" id="quantity" name="quantity" min="1" max="{{ $product->stock }}" value="1" style="width: 60px;">
                            <button type="button" class="btn btn-outline-secondary" id="plus-btn">+</button>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Bayar</button>
                </form>
            @else
                <a href="{{ route('login') }}" class="btn btn-primary">Login untuk membeli</a>
            @endauth
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const quantityInput = document.getElementById('quantity');
        const plusBtn = document.getElementById('plus-btn');
        const minusBtn = document.getElementById('minus-btn');
        const maxQuantity = {{ $product->stock }};
        
        // Handle plus button click
        plusBtn.addEventListener('click', function () {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue < maxQuantity) {
                quantityInput.value = currentValue + 1;
            }
        });

        // Handle minus button click
        minusBtn.addEventListener('click', function () {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    });
</script>
@endpush
`,
      },

      {
        type: "text",
        content:
          "untuk view transaction atau payment midtrans nya resources/views/transactions/payment.blade.php",
      },

      {
        type: "code",
        content: `@extends('layouts.app') 

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Payment</div>
                <div class="card-body">
                    <h5>Order ID: {{ $transaction->order_id }}</h5>
                    <h5>Total Amount: Rp {{ number_format($transaction->total_amount) }}</h5>
                    <button id="pay-button" class="btn btn-primary">Pay Now</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="{{ config('midtrans.client_key') }}"></script>
<script>
    const payButton = document.querySelector('#pay-button');
    payButton.addEventListener('click', function(e) {
        e.preventDefault();

        const transaction = {!! json_encode($transaction) !!};
        
        snap.pay('{{ $transaction->snap_token }}', {
            onSuccess: function(result) {
                // Kirim request ke backend untuk update status
                fetch('/transactions/update-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({
                        order_id: transaction.order_id
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Payment success!');
                        
                        window.location.href = '/';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error updating the payment status');
                });
            },
            onPending: function(result) {
                alert('Please complete your payment');
            },
            onError: function(result) {
                alert('Payment failed!');
            },
            onClose: function() {
                alert('You closed the popup without finishing the payment');
            }
        });
    });
</script>
@endpush`,
      },

      {
        type: "text",
        content:
          "untuk view history transaction resources/views/transactions/history.blade.php",
      },

      {
        type: "code",
        content: `@extends('layouts.app')

@section('content')
<div class="container">
    <h2 class="mb-4">Transaction History</h2>
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Products</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach($transactions as $transaction)
                    <tr>
                        <td>{{ $transaction->order_id }}</td>
                       <td>{{ \\Carbon\\Carbon::parse($transaction->created_at)->translatedFormat('d F Y H:i') }}</td>

                        {{-- <td>{{ $transaction->created_at->diffForHumans() }}</td> --}}
                        <td>
                            @foreach($transaction->items as $item)
                                <div>{{ $item->product->name }} ({{ $item->quantity }}x)</div>
                            @endforeach
                        </td>
                        <td>Rp {{ number_format($transaction->total_amount) }}</td>
                        <td>
                            <span class="badge bg-{{ $transaction->status === 'paid' ? 'success' : ($transaction->status === 'pending' ? 'warning' : 'danger') }}">
                                {{ ucfirst($transaction->status) }}
                            </span>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
`,
      },

      {
        type: "text",
        content:
          "untuk route nya resources/routes/web.php",
      },


      {
        type: "code",
        content: `<?php

use App\\Http\\Controllers\\Auth\\LoginController;
use App\\Http\\Controllers\\ProductController;
use App\\Http\\Controllers\\TransactionController;
use Illuminate\\Support\\Facades\\Route;



Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::middleware(['auth'])->group(function () {
    Route::post('/checkout', [TransactionController::class, 'checkout'])->name('checkout');
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
});

// URL pemberitahuan pembayaran - kecualikan dari CSRF
Route::post('/payment/callback', [TransactionController::class, 'callback'])->name('payment.callback');
Route::post('/transactions/update-status', [TransactionController::class, 'updatePaymentStatus'])->name('transactions.update-status');

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
`
      },


      {
        type: "text",
        content:
          "untuk menambahkan product dan user login saya menggunakan seeder atau dumy data jika anda ingin menggunakan auth login ada toturial nya di web ini karena code ini terlalu panjang saya menggunakan seeder untuk cara nya di bawah ini buatkan model seeder nya untuk product",
      },

      {
        type: "code",
        content: `php artisan make:seeder ProductSeeder`,
      },

      {
        type: "code",
        content: `php artisan make:seeder UserSeeder
`,
      },


      {
        type: "text",
        content:
          "scema untuk seeder data product nya database/seeders/ProductSeeder.php",
      },

      {
        type: "code",
        content: `<?php

namespace Database\\Seeders;

use App\\Models\\Product;
use Illuminate\\Database\\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [  //ubah field nya opsional untuk data barang nya
            [
                'name' => 'MSI RTX 3070 Ti GAMING X TRIO 8G GDDR6 3070Ti RTX3070Ti 8GB VGA NVIDIA',
                'description' => 'TITIP JUAL DARI KONSUMEN (CONSIGN)
*FOTO PRODUK 100% REAL PIC PRODUK YANG SEDANG DIJUAL (TIDAK REKAYASA)
READY STOCK LIMITED SELAGI IKLAN TAYANG
',
                'price' => 4480000,
                'stock' => 10,
                'image' => 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/7/28/28648518-8a5c-44c3-88f9-c5bab8fb5512.jpg'
            ],
            [
                'name' => 'ASUS STRIX RTX 3080 GUNDAM 10GB OC WHITE ROG 10G RTX3080 GDDR6X VGA',
                'description' => 'GARANSI RESMI ASUS (End Mei 2024) (Garansi Toko 1 Minggu) Sebelum order dimohon kepada pembeli untuk menanyakan stock terlebih dahulu.',
                'price' => 10880000,
                'stock' => 15,
                'image' => 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/7/8/06d4509d-50fd-4adb-8f52-7b768d3b7617.png'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
`,
      },

      {
        type: "text",
        content:
          "scema untuk seeder data user login nya database/seeders/UserSeeder.php",
      },

      {
        type: "code",
        content: `<?php

namespace Database\\Seeders;

use App\\Models\\User;
use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([ //ubah field nya opsional untuk login
            'name' => 'EzaDev', 
            'email' => 'EzaDev@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
`,
      },

      {
        type: "text",
        content:
          "jika sudah, jalankan seeder nya untuk menyimpan data statik nya atau dumy data, jalankan ke 2 perintah ini",
      },

      {
        type: "code",
        content: `php artisan db:seed --class=ProductSeeder`,
      },

      {
        type: "code",
        content: `php artisan db:seed --class=UserSeeder`,
      },

      {
        type: "text",
        content:
          "jika sudah, jalankan laravel dan tes login dan payment nya, jika ada error silahkan chat room  atau dm saya https://www.tiktok.com/@ahmadafriza25",
      },

      {
        type: "code",
        content: `php artisan serve`,
      },

      {
        type: "text",
        content:
          "jika ingin zona waktu indonsia set variabel ini di config/app.php ini opsional",
      },

      {
        type: "code",
        content: `'locale' => 'id',
'fallback_locale' => 'id',
'faker_locale' => 'id_ID',
'timezone' => 'Asia/Jakarta',
`,
      },

      {
        type: "text",
        content:
          " jika ada error silahkan chat room  atau dm saya https://www.tiktok.com/@ahmadafriza25",
      },
    ],
  },
];

export default posts;
