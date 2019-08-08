# Copyright 2017-2019 EPAM Systems, Inc. (https://www.epam.com/)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

if [ -z "$LIBREOFFICE_DISTR_URL" ]; then
    LIBREOFFICE_DISTR_URL="https://s3.amazonaws.com/cloud-pipeline-oss-builds/tools/libreoffice/LibreOffice_6.1.5_Linux_x86-64_rpm.tar.gz"
fi

cd /opt && \
wget -q "$LIBREOFFICE_DISTR_URL" -O LibreOffice.tar.gz && \
tar -zxf LibreOffice.tar.gz && \
yum localinstall -y LibreOffice*/RPMS/*.rpm && \
rm -rf LibreOffice*