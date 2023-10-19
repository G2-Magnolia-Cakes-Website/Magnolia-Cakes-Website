from django.contrib import admin

# add include to the path
from django.urls import path, include

# import views from todo
from MagnoliaCakesAndCupcakes import views

# JWT token creation
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# import routers from the REST framework
# it is necessary for routing
from rest_framework import routers

# create a router object
router = routers.DefaultRouter()

# register the router
router.register(
    r"MagnoliaCakesAndCupcakes",
    views.MagnoliaCakesAndCupcakesView,
    "MagnoliaCakesAndCupcakes",
)


urlpatterns = [
    path("admin/", admin.site.urls),
    # add another path to the url patterns
    # when you visit the localhost:8000/api
    # you should be routed to the django Rest framework
    path("api/", include(router.urls)),
    path("api/register/", views.register, name="api-register"),
    path("activate/<uidb64>/<token>", views.activate, name="activate"),
    path(
        "api/terms-and-conditions/",
        views.terms_and_conditions,
        name="terms-and-conditions",
    ),
    path("api/login/", views.login, name="api-login"),
    path("api/user/", views.get_user, name="get-user"),
    path("api/logout/", views.LogoutView.as_view(), name="logout"),
    path("api/products/", views.products_list, name="products-list"),
    path("api/flavors/", views.flavor_list, name="flavors-list"),
    path("api/cakes/", views.cakes_list, name="cakes-list"),
    path("api/faq/categories/", views.faq_categories_list, name="faq-categories-list"),
    path("api/faq/questions/", views.faq_questions_list, name="faq-questions-list"),
    path("api/contact/", views.contact, name="contact"),
    path(
        "api/flavours-and-servings/",
        views.flavours_and_servings,
        name="flavours-and-servings",
    ),
    path(
        "api/flavours-and-servings-info/",
        views.flavours_and_servings_info,
        name="flavours-and-servings-info",
    ),
    path("api/about-us/", views.about_us, name="about-us"),
    path("api/footer-location/", views.footer_location, name="footer-location"),
    path("api/footer-contact-us/", views.footer_contact_us, name="footer-contact-us"),
    path(
        "api/footer-business-hrs/",
        views.footer_business_hrs,
        name="footer-business-hrs",
    ),
    path(
        "api/social-medias/",
        views.social_medias,
        name="social-medias",
    ),
    path(
        "api/location-page/",
        views.location_page_content,
        name="location-page",
    ),
    path("api/slider-images/", views.slider_images, name="slider-images"),
    path("api/log-quote/", views.log_quote, name="log-quote"),
    path("api/homepage-welcome/", views.welcome_section, name="welcome-section"),
    path("api/homepage-about-us/", views.about_us_section, name="about-us-section"),
    path("api/homepage-gallery/", views.gallery_section, name="gallery-section"),
    
    # JWT token creation
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    
    # Reset password
    path(
        "api/reset/password/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),

	# Change first and last name
	path("api/reset/names/", views.reset_names, name="reset_names"),
    path(
        "api/gallery/categories/",
        views.gallery_categories_list,
        name="gallery_categories_list",
    ),
    path("api/gallery/items/", views.gallery_items_list, name="gallery_items_list"),
    path('api/checkout/', views.create_checkout_session, name='checkout'),
    path("api/video/", views.video, name="video"),

    # User videos
    path("api/user/videos/", views.get_videos, name="get_videos"),
    path("api/user/purchase/video/<int:video_id>/", views.purchase_videos, name="purchase_videos"),

    # Promotions
    path("api/promotions/displayed/", views.get_displayed_promotion, name="displayed_promotion"),
    path("api/user/purchase/first/get/", views.get_user_firstOrderBoolean, name="first_order_boolean"),
    path("api/user/purchase/success/", views.set_user_firstOrder_true, name="first_order_true"),
    
    # User purchases
    path("api/user/purchase/items/", views.process_order, name="purchase_order"),
    path("api/user/get/purchases/", views.get_orders, name="get_purchases"),
    path("api/videos/<int:video_id>/", views.get_video, name="get_video"),
    path("api/cakes/<int:cake_id>/", views.get_cake, name="get_cake"),
    path("api/cupcakes/<int:cake_id>/", views.get_cupcake, name="get_cupcake"),
]
