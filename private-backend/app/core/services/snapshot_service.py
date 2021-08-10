from core.models import Snapshot

def create_snapshot(sanitized_name, sanitized_theme, sanitized_file):
    # The service validates user input (optional)
    #if Snapshot.objects.filter(snapshot=sanitized_file).exists():
    
        
    # enforces business requirements (optional) & returns errors to the views
    
    # performs all business logic 
    snapshot_model = Snapshot.objects.create(
        name=sanitized_name,
        theme=sanitized_theme,
        snapshot=sanitized_file,
    )
    snapshot_model.full_clean()
    snapshot_model.save()
    
    #returns the object
    return snapshot_model