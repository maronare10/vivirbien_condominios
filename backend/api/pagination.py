from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

# LINK: https://medium.com/@mohammadali.khandan/customizing-pagination-in-django-rest-framework-49f09a8109e3


class CustomPagination(PageNumberPagination):
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })