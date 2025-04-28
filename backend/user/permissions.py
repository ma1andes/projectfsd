from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """Allow access only to admin (staff) users."""
    message = "Для выполнения этого действия вы должны быть пользователем с правами администратора."

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class IsAuthenticatedUser(BasePermission):
    """Allow access only to authenticated users."""
    message = "Для выполнения этого действия вы должны пройти проверку подлинности."

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)


class IsOwner(BasePermission):
    """Allow access only to the owner of the object."""
    message = "Для выполнения этого действия вы должны быть владельцем этого объекта."

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return hasattr(obj, 'user') and obj.user == request.user
