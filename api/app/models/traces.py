from bson import ObjectId


class Traces:
    def __init__(
        self,
        onlineClass: str,
        user: str,
        url: str,
        title: str,
        muted: bool,
        cameraEnabled: bool,
        microphoneEnabled: bool,
        camereaStreaming: bool,
        microphoneStreaming: bool,
        lastAccessed: str,
        timestamp: str,
        event: str,
        _id: ObjectId = None
    ):
        self._id = _id
        self.onlineClass = onlineClass
        self.user = user
        self.url = url
        self.title = title
        self.muted = muted
        self.cameraEnabled = cameraEnabled
        self.microphoneEnabled = microphoneEnabled
        self.camereaStreaming = camereaStreaming
        self.microphoneStreaming = microphoneStreaming
        self.lastAccessed = lastAccessed
        self.timestamp = timestamp
        self.event = event

    def to_dict(self):
        data = {
            "onlineClass": self.onlineClass,
            "user": self.user,
            "url": self.url,
            "title": self.title,
            "muted": self.muted,
            "cameraEnabled": self.cameraEnabled,
            "microphoneEnabled": self.microphoneEnabled,
            "camereaStreaming": self.camereaStreaming,
            "microphoneStreaming": self.microphoneStreaming,
            "lastAccessed": self.lastAccessed,
            "timestamp": self.timestamp,
            "event": self.event,
        }
        if self._id:
            data["_id"] = str(self._id)
        return data
