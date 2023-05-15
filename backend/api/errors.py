'''
File to store application exceptions
'''

class RequiredRequestDataField(Exception):
    def __init__(self, field):
        self.field = field
        self.message = field + " is required in request body."
        super().__init__(self.message)

class NoneRequestDataField(Exception):
    def __init__(self, field):
        self.field = field
        self.message = field + " must not be none."
        super().__init__(self.message)
