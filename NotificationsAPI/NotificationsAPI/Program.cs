using Microsoft.Extensions.Options;
using NotificationsAPI.Service;
using NotificationsAPI.Settings;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<MongoDbSettings>(
builder.Configuration.GetSection(nameof(MongoDbSettings)));
builder.Services.AddSingleton<IMongoDbSettings>(sp => sp.GetRequiredService<IOptions<MongoDbSettings>>().Value);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<IAnnouncementCollectionService, AnnouncementCollectionService>();
builder.Services.AddSwaggerGen(
	c =>
	{
		var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
		var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
		c.IncludeXmlComments(xmlPath);
	});
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAngularOrigins",
		builder =>
		{
			builder.WithOrigins("http://localhost:4200")
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials();
		});
});
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularOrigins");

app.UseWebSockets(new WebSocketOptions
{
	KeepAliveInterval = TimeSpan.Zero
});

app.UseRouting();

app.UseEndpoints(endpoints =>
{
	endpoints.MapHub<NotificationsHub>("/hub/notifications");
});

app.MapControllers();

app.Run();
