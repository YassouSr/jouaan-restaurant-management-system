from rest_framework.permissions import BasePermission

METHOD_ALLOW = ('GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS')

class IsCustomerUser(BasePermission):
  message = 'You are not allowed to perform this action.'

  def has_permission(self, request, view):
    if request.method in METHOD_ALLOW and request.user.role == 'customer':
      return True
    else:
      return False

class IsRAdminUser(BasePermission):
  message = 'You are not allowed to perform this action.'

  def has_permission(self, request, view):
    if request.method in METHOD_ALLOW and request.user.role == 'admin':
      return True
    else:
      return False

class IsDriverUser(BasePermission):
  message = 'You are not allowed to perform this action.'

  def has_permission(self, request, view):
    if request.method in METHOD_ALLOW and request.user.role == 'driver':
      return True
    else:
      return False
    
class IsChefUser(BasePermission):
  message = 'You are not allowed to perform this action.'

  def has_permission(self, request, view):
    if request.method in METHOD_ALLOW and request.user.role == 'chef':
      return True
    else:
      return False
